'use client'


import '../i18n';
import {Header} from "@/app/components/dashboard/header";
import Container from '@mui/material/Container';
import {Box, Button, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Form } from '../components/energy/Form';
import { useEffect, useState } from 'react';

import { Energy } from '../models/Energy/Energy';
import { Option } from '../models/Select/Option';
import { Comment } from '../models/Energy/Comment';
import { useTranslation } from "react-i18next";
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'next/navigation';
import { getSubCategories } from '@/api/categories';
import { getComments } from '@/api/comments';
import { addEnergy, addEnergyComment, deleteEnergy, getEmissions } from '@/api/emissions';
import { getUserCookies } from '@/api/auth';

const CustomContainer = styled('div')`
    z-index: 1030;
    background-color: white;
`

const EnergyWrapper = styled(Box)`
    max-width: 100%;
    min-height: calc(100vh - 290px);
    padding-top: 60px;
    padding-bottom: 80px;
    a {
        color: #6d6d6d;
    }
    a:hover {
        color: black;
    }
`

const Link = styled('a')`
    text-decoration: none;
`

const CustomH4 = styled('h4')`
    font-size: 1rem;
    text-align: center;
`

const OrangeButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    minWidth: 150,
    minHeight: 40,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}));


const PrimaryButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    minWidth: "100%",
    minHeight: 57,
    marginTop: 31,
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
}));

const Paragraph = styled("p")`
    text-align: right;
    /*margin-bottom: 15px;*/
    font-size: 14px
`;

const LabelInput = styled("label")`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px
`;

export default function EnergyPage() {
    const theme = useTheme();

    const searchParams = useSearchParams()

    const { t, i18n } = useTranslation();

    const [energyID, setEnergyID] = useState<number|null>(null);

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState<string|null>(null);

    const [fuelData, setFuelData] = useState<Energy[]>([]);
    const [electricityData, setElectricityData] = useState<Energy[]>([]);
    const [advancedData, setAdvancedEnergyData] = useState<Energy[]>([]);

    // Comments Array
    const [fuelComments, setFuelComments] = useState<Comment[]>([]);
    const [electricityComments, setElectricityComments] = useState<Comment[]>([]);
    const [advancedComments, setAdvancedComments] = useState<Comment[]>([]);

    const [sub_categories, setSubCategories] = useState<any>([]);

    const [loadingFuel, setLoadingFuel] = useState(false);
    const [loadingElectricity, setLoadingElectricity] = useState(false);
    const [loadingAdvanced, setLoadingAdvanced] = useState(false);

    const [loadingCommentsFuel, setLoadingCommentsFuel] = useState(false);
    const [loadingCommentsElectricity, setLoadingCommentsElectricity] = useState(false);
    const [loadingCommentsAdvanced, setLoadingCommentsAdvanced] = useState(false);


    const handleAddEnergy = async (eng:Energy) => {
        const indexCategory: number = sub_categories.findIndex((c:any) => c.label.toLowerCase() == eng.category);
        if(indexCategory > -1){
            const subCategory = sub_categories[indexCategory];
            const formData = new FormData();
            formData.append("category_id", `${energyID}`);
            formData.append("sub_category_id", `${subCategory.id}`);
            formData.append("label", `${eng.category}`);
            formData.append("type", `${eng.type}`);
            formData.append("value", `${eng.value}`);

            const res = await addEnergy(formData);

            if(res.error){
                console.error(res.error);
                return;
            }

            if(res.data.id){
                eng.id = res.data.id;
            }

            switch (eng.category) {
                case "fuel":
                    setFuelData([...fuelData, eng]);
                    break;
                case "electricity":
                    setElectricityData([...electricityData, eng]);
                    break;
                case "advanced":
                    setAdvancedEnergyData([...advancedData, eng]);
                    break;
                default:
                    // Code block for default case
            }
        }
        
    }

    const handleAddComment = async (comment: Comment, category: string) => {
        const indexCategory: number = sub_categories.findIndex((c:any) => c.label.toLowerCase() == category);
        if(indexCategory > -1){
            const subCategory = sub_categories[indexCategory];
            const formData = new FormData();
            formData.append("sub_category_id", `${subCategory.id}`);
            formData.append("comment", `${comment.text}`);
            formData.append("created_at", `${comment.created_at.toISOString()}`);
            formData.append("craeted_by", comment.created_by);

            const res = await addEnergyComment(formData);

            if(res.error){
                console.error(res.error);
                return;
            }

            if(res.data.id){
                comment.id = res.data.id;
            }
            switch (category) {
                case "fuel":
                    setFuelComments([...fuelComments, comment]);
                    break;
                case "electricity":
                    setElectricityComments([...electricityComments, comment]);
                    break;
                case "advanced":
                    setAdvancedComments([...advancedComments, comment]);
                    break;
                default:
                    // Code block for default case
            }
        }
    }

    const handleDelete = async (eng:Energy) => {
        
        const res = await deleteEnergy(eng.id);

        if(res.error){
            console.log(res.error);
            return;
        }

        switch (eng.category) {
            case "fuel":
                setFuelData(fuelData.filter((item) => item.id != eng.id));
                break;
            case "electricity":
                setElectricityData(electricityData.filter((item) => item.id != eng.id));
                break;
            case "advanced":
                setAdvancedEnergyData(advancedData.filter((item) => item.id != eng.id));
                break;
            default:
                // Code block for default case
        } 
    }

    useEffect(() => {
        const fetchSession = async () => {
            const cookies = await getUserCookies();

            if(cookies){
                if(cookies.user_email){
                    setUsername(cookies.user_email.split("@")[0]);
                }
            }
        }
       
        fetchSession();
    }, []);

    const unitesFuel = new Map<string, string>([
        ["Heating oil", "kWh LHV"],
        ["Heavy fuel oil", "kgCO2e/kWh net heating value"],
        ["Natural gas", "kgCO2e/kWh gross heating value"],
        ["Wood pellets (8% humidity)", "kgCO2e/kWh net heating value"],
    ]);

    useEffect(()=> {
        
        if(searchParams){
            if(Number(searchParams.get("id"))){
                setEnergyID(Number(searchParams.get("id")));
                fecthSubCategories(Number(searchParams.get("id")));
            }
        }
    }, [searchParams])

    const fecthSubCategories = async (category_id:number) => {
        setLoading(true);
        try {
            const res = await getSubCategories(category_id);
            
            setSubCategories(res);
            fetchEmissions(res);
            fetchComments(res);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const fetchEmissions = (res:any) => {
        setLoadingFuel(true);
        setLoadingElectricity(true);
        setLoadingAdvanced(true);
        res.map(async (c:any) => {
            const res = await getEmissions(c.id);
            if(!res.error){
                if(res.emission){
                    switch (c.label.toLowerCase()) {
                        case "fuel":
                            setFuelData(res.emission.map((e:any) => new Energy(e.id, e.type, e.value, c.label.toLowerCase())));
                            setLoadingFuel(false);
                            break;
                        case "electricity":
                            setElectricityData(res.emission.map((e:any) => new Energy(e.id, e.type, e.value, c.label.toLowerCase())));
                            setLoadingElectricity(false);
                            break;
                        case "advanced":
                            setAdvancedEnergyData(res.emission.map((e:any) => new Energy(e.id, e.type, e.value, c.label.toLowerCase())));
                            setLoadingAdvanced(false);
                            break;
                        default:
                            // Code block for default case
                    }
                }
            }
        })
    }

    const fetchComments = (res:any) => {
        setLoadingCommentsFuel(true);
        setLoadingCommentsElectricity(true);
        setLoadingCommentsAdvanced(true);
        res.map(async (c:any) => {
            const res = await getComments(c.id);
            if(!res.error){
                if(res.comments){
                    switch (c.label.toLowerCase()) {
                        case "fuel":
                            setFuelComments(res.comments.map((e:any) => new Comment(e.id, e.comment, c.label.toLowerCase(), e.craeted_by, e.created_at)));
                            setLoadingCommentsFuel(false);
                            break;
                        case "electricity":
                            setElectricityComments(res.comments.map((e:any) => new Comment(e.id, e.comment, c.label.toLowerCase(), e.craeted_by, e.created_at)));
                            setLoadingCommentsElectricity(false);
                            break;
                        case "advanced":
                            setAdvancedComments(res.comments.map((e:any) => new Comment(e.id, e.comment, c.label.toLowerCase(), e.craeted_by, e.created_at)));
                            setLoadingCommentsAdvanced(false);
                            break;
                        default:
                            // Code block for default case
                    }
                }
            }
        })
    }

    const enegryComponents : any = {
        "fuel": <Form 
                    key={"fuel"}
                    username={username}
                    category='fuel'
                    data={fuelData}
                    options={[new Option(t('abc-heating-oil'), "Heating oil"),
                        new Option(t('abc-heavy-fuel-oil'),  "Heavy fuel oil"),
                        new Option(t('abc-natural-gas'), "Natural gas"),
                        new Option(t('abc-wood-pellets'), "Wood pellets (8% humidity)")]}
                    handleAdd={handleAddEnergy}
                    handleDelete={handleDelete}
                    titleSelectInput={t('abc-kind-of-fuel')}
                    titleAnnualConsumptionInput={t('abc-annual-consumption')}
                    tableHeader={[t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]}
                    description={t('abc-energy-fuel-description')}
                    comments={fuelComments}
                    handleAddComment={handleAddComment}
                    hasUnites={true}
                    unites={unitesFuel}
                    loadingData={loadingFuel}
                    loadingComments={loadingCommentsFuel}
                />,
        "electricity": <Form 
                            key={"electricity"}
                            username={username}
                            category='electricity'
                            data={electricityData}
                            options={[new Option(t('abc-january'), "January"),
                                new Option(t('abc-february'), "February"),
                                new Option(t('abc-march'), "March"),
                                new Option(t('abc-april'), "April"),
                                new Option(t('abc-may'), "May"),
                                new Option(t('abc-june'), "June"),
                                new Option(t('abc-july'), "July"),
                                new Option(t('abc-august'), "August"),
                                new Option(t('abc-september'), "September"),
                                new Option(t('abc-october'), "October"),
                                new Option(t('abc-november'), "November"),
                                new Option(t('abc-december'), "December")]}
                            handleAdd={handleAddEnergy}
                            handleDelete={handleDelete}
                            titleSelectInput={t('abc-bill-of-the-month')}
                            titleAnnualConsumptionInput={t('abc-consumption-from-latest-bill')+' (kWh)'}
                            tableHeader={[t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]}
                            description={t('abc-energy-electricity-description')}
                            comments={electricityComments}
                            handleAddComment={handleAddComment}
                            loadingData={loadingElectricity}
                            loadingComments={loadingCommentsElectricity}
                        />,
        "advanced": <Form 
                        key={"advanced"}
                        username={username}
                        category='advanced'
                        data={advancedData}
                        options={[new Option(t('abc-ch4'), "CH4"),
                            new Option(t('abc-c3h8'), "C3H8"),
                            new Option(t('abc-c4h10'), "C4H10"),
                            new Option(t('abc-n20'), "N20"),
                            new Option(t('abc-sf6'), "SF6"),
                            new Option(t('abc-nf3'), "NF3")]}
                        handleAdd={handleAddEnergy}
                        handleDelete={handleDelete}
                        titleSelectInput={t('abc-kind-of-gas')}
                        titleAnnualConsumptionInput={t('abc-quantity') +'(kgCO2e/kg)'}
                        tableHeader={[t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]}
                        description={t('abc-energy-advanced-description')}
                        comments={advancedComments}
                        handleAddComment={handleAddComment}
                        loadingData={loadingAdvanced}
                        loadingComments={loadingCommentsAdvanced}
                    />
    }

    return (
        <>
            <CustomContainer>
                <Header/>
            </CustomContainer>
            <Container maxWidth="xl">
                {loading ? 
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        <CircularProgress />
                    </Box>
                :(<EnergyWrapper key={Math.random()}>
                    <Grid container spacing={3} alignItems={"center"} marginBottom={5}>
                        <Grid item  md={3}>
                            <Link href='/dashboard'>
                                <ArrowBackIosNewIcon />
                            </Link>
                        </Grid>
                        <Grid item  md={6}>
                            <CustomH4>{t('abc-energy')}</CustomH4>
                        </Grid>
                        <Grid container md={3} justifyContent={"flex-end"}>
                            <OrangeButton onClick={()=> {
                                console.log("click submit");
                                
                            }}>{t('abc-submit')}</OrangeButton>
                        </Grid>
                    </Grid>
                    {sub_categories.map((c:any, _index:number) => enegryComponents[c.label.toLowerCase()] ? (<>
                        {enegryComponents[c.label.toLowerCase()]}
                        <Box key={Math.random()} height={80}></Box>
                    </>) : <></>)}
                   <Grid container spacing={2} alignItems={"center"}  justifyContent={"center"} marginBottom={5}>
                            <Grid item md={3} justifyContent={"flex-end"}>
                                <PrimaryButton onClick={()=> {
                                    console.log("click submit");
                                    
                                }}>{t('abc-save')}</PrimaryButton>
                            </Grid>
                            <Grid item md={3} justifyContent={"flex-start"}>
                                <PrimaryButton style={{backgroundColor: theme.palette.secondary.main}} onClick={()=> {
                                    console.log("click submit");
                                    
                                }}>{t('abc-submit')}</PrimaryButton>
                            </Grid>
                    </Grid>
                </EnergyWrapper>)}
            
            </Container>
        </>
    );
};

