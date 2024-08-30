'use client'


import '../i18n';
import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Box, Button, FormControl, Grid, IconButton, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import Divider from '@mui/material/Divider';
import {Stats} from "@/app/components/dashboard/stats";
import {useTheme} from "@mui/material/styles";
import {border, styled} from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CancelPresentationOutlined, Category, ClosedCaptionSharp, CloseFullscreenOutlined, CloseOutlined, CloseSharp, DeleteOutline, KeyboardArrowDown } from '@mui/icons-material';
import { Form } from '../components/energy/Form';
import { useEffect, useState } from 'react';

import { Energy } from '../models/Energy/Energy';
import { Option } from '../models/Select/Option';
import { Comment } from '../models/Energy/Comment';
import { AddEnergy, AddEnergyComment, DeleteEnergy, getComments, getEmissions, getSession, getSubCategories } from '@/lib';
import { useTranslation } from "react-i18next";
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'next/navigation';

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

    const energyID = 1;

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState(null);

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

            const res = await AddEnergy(formData);

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

            const res = await AddEnergyComment(formData);

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
        
        const res = await DeleteEnergy(eng.id);

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
            const sessionCookie = await getSession();
            if(sessionCookie){
                if(sessionCookie.login && sessionCookie.login.user){
                    if(sessionCookie.login.user.email){
                        setUsername(sessionCookie.login.user.email.split("@")[0]);
                    }
                }
            }
        }
       
        fetchSession();
        fecthSubCategories();
    }, []);

    const unitesFuel = new Map<string, string>([
        ["Heating oil", "kWh LHV"],
        ["Heavy fuel oil", "kgCO2e/kWh net heating value"],
        ["Natural gas", "kgCO2e/kWh gross heating value"],
        ["Wood pellets (8% humidity)", "kgCO2e/kWh net heating value"],
    ]);

    useEffect(()=> {
        
        if(searchParams){
            console.log(searchParams.get("id"));
        }
    }, [searchParams])

    const fecthSubCategories = async () => {
        setLoading(true);
        try {
            const res = await getSubCategories(1);
            
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
                    options={[new Option("Heating oil", "Heating oil"), new Option("Heavy fuel oil",  "Heavy fuel oil"), new Option("Natural gas", "Natural gas"), new Option("Wood pellets (8% humidity)", "Wood pellets (8% humidity)")]}
                    handleAdd={handleAddEnergy}
                    handleDelete={handleDelete}
                    titleSelectInput='Which kind of fuel?'
                    titleAnnualConsumptionInput='Annual consumption'
                    tableHeader={["TYPE OF FUEL", "Values", "Emission factor", "Uncertainty"]}
                    description={"Your school probably has one or several boilers or furnaces for heating. Boilers consume heating oil, natural gas or fuelwood to produce heat, and in the process emit large amounts of greenhouse gases.Record the quantity of fuel consumed in the course of one year by your school (for instance, January through December). The school might have a general bill or different bills. In the case of a general bill just insert the data in the fields below, in the case of different bills you’ll have to do some math and to check your results with your teacher. If you are considering periods of time shorter than a year you should be aware that time is relevant in this data and you should consider the seasonal variation when calculating an average."}
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
                            options={[new Option("January", "January"), new Option("February", "February"), new Option("March", "March"), new Option("April", "April"), new Option("May", "May"), new Option("June", "June"), new Option("July", "July"), new Option("August", "August"), new Option("September", "September"), new Option("October", "October"), new Option("November", "November"), new Option("December", "December")]}
                            handleAdd={handleAddEnergy}
                            handleDelete={handleDelete}
                            titleSelectInput='Bill of the month'
                            titleAnnualConsumptionInput='Consumption from latest bill (kWh)'
                            tableHeader={["Bill of the month", "Values", "Emission factor", "Uncertainty"]}
                            description={"Your school is connected to the power grid in your country. Electricity is generated by nuclear power plants, coal-fired plants, hydropower dams, and is increasingly supplied by wind turbines, solar panels and other renewable energy installations. Record here the electricity consumption for your school (we suggest to insert records for one whole year, from January to December). The school should have an electricity bill (normally it is one for one year). It is country dependent and it should be automatic in the calculator - set when the teacher sets the country."}
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
                        options={[new Option("CH4 (Methane)", "CH4"), new Option("C3H8 (Propane)", "C3H8"), new Option("C4H10 (Butane)", "C4H10"), new Option("N2O (Nitrogen oxide)", "N20"), new Option("SF6 (Sulfur hexafluoride)", "SF6"), new Option("NF3 (Nitrogen trifluoride)", "NF3")]}
                        handleAdd={handleAddEnergy}
                        handleDelete={handleDelete}
                        titleSelectInput='Which kind of Gas?'
                        titleAnnualConsumptionInput='Quantity (kgCO2e/kg)'
                        tableHeader={["BUNSEN BURNER'S GAS", "Values", "Emission factor", "Uncertainty"]}
                        description={"Your school undoubtedly has science labs equipped with bunsen burners that produce a flame by burning natural gas, and so they also emit greenhouse gases. For the purposes of your estimation, assume that 100% of the gas is consumed by the flame. Gather information on the amount of gas consumed for the science labs, workshops and other classroom activities, and enter the associated CO2 emissions. Your science lab should have its own bills on the gases that are used for the scientific experiments."}
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
                            <Link href='#'>
                                <ArrowBackIosNewIcon />
                            </Link>
                        </Grid>
                        <Grid item  md={6}>
                            <CustomH4>ENERGY</CustomH4>
                        </Grid>
                        <Grid container md={3} justifyContent={"flex-end"}>
                            <OrangeButton onClick={()=> {
                                console.log("click submit");
                                
                            }}>SUBMIT</OrangeButton>
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
                                    
                                }}>SAVE</PrimaryButton>
                            </Grid>
                            <Grid item md={3} justifyContent={"flex-start"}>
                                <PrimaryButton style={{backgroundColor: theme.palette.secondary.main}} onClick={()=> {
                                    console.log("click submit");
                                    
                                }}>SUBMIT</PrimaryButton>
                            </Grid>
                    </Grid>
                </EnergyWrapper>)}
            
            </Container>
        </>
    );
};

