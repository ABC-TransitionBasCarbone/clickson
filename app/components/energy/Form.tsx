import {Header} from "@/app/components/dashboard/header";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import {Alert, AlertTitle, Box, Button, FormControl, Grid, IconButton, MenuItem, OutlinedInput, Select, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import Divider from '@mui/material/Divider';
import {Stats} from "@/app/components/dashboard/stats";
import {useTheme} from "@mui/material/styles";
import {border, styled} from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CancelPresentationOutlined, ClosedCaptionSharp, CloseFullscreenOutlined, CloseOutlined, CloseSharp, DeleteOutline, KeyboardArrowDown } from '@mui/icons-material';
import { Energy } from "@/app/models/Energy/Energy";
import { Option } from "@/app/models/Select/Option";
import { useEffect, useState } from "react";
import { generateUuid } from "@/app/helpers/uuid";
import { Comment } from "@/app/models/Energy/Comment";
import CircularProgress from '@mui/material/CircularProgress';

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

interface Props {
    username: string|null,
    data: Energy[],
    category: string,
    description: string,
    options: Option[],
    titleSelectInput: string,
    titleAnnualConsumptionInput: string,
    tableHeader: string[],
    comments: Comment[],
    hasUnites?: boolean,
    unites?: Map<string, string> | null,
    loadingData: boolean,
    loadingComments: boolean,
    handleAddComment: (newComment: Comment, category: string) => void,
    handleAdd: (newEnergy: Energy) => void,
    handleDelete: (item: Energy) => void
}

export const Form = ({username, data, category, description, options, titleSelectInput, titleAnnualConsumptionInput, tableHeader, comments, hasUnites=false, unites=null, loadingData, loadingComments, handleAdd, handleDelete, handleAddComment}: Props) => {

    const theme = useTheme();

    const [type, setType] = useState("")
    const [value, setValue] = useState("");
    const [textComment, setComment] = useState("");

    const [totalValues, setTotalValues] = useState(0);
    const [totalUncertainty, setTotalUncertainty] = useState(0);

    const [isExpanded, setIsExpanded] = useState(false);

    const [saving, setSaving] = useState(false);
    const [savingComment, setSavingComment] = useState(false);

    const hangleAddEnergy = async () => {
        if(type && value){
            if(Number(value)){
                setSaving(true);
                await handleAdd(new Energy(generateUuid(), type, Number(value), category));
                setType("");
                setValue("");
                setSaving(false);
                return;
            }
        }
        alert("Ajouter une valeur");
        
    }

    const addComment = async () => {
        if(username == undefined || username == null){
            alert("Tu n'es pas connecté");
            return;
        }
        if(textComment){
            if(textComment.trim().length > 0){
                const comment = new Comment(generateUuid(), textComment, category, username, new Date());
                setSavingComment(true);
                await handleAddComment(comment, category);
                setComment("");
                setSavingComment(false);
                return;
            }
        }
        alert("Ajouter un commentaire");
    }

    useEffect(() => {
        // Calculate Total of values
        const total1 = data.reduce((accumulator, currentItem) => {
            return accumulator + Number(currentItem.value);
        }, 0);
        setTotalValues(total1);

        // Calculate Total of Uncertainty
        const total2 = data.reduce((accumulator, currentItem) => {
            return accumulator + Number(currentItem.uncertainty);
        }, 0);
        setTotalUncertainty(total2);
    }, [data]);
    
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return <>
        <h4>ENERGY - {category.toUpperCase()}</h4>
        <Divider aria-hidden="true" sx={{ marginTop: theme.spacing(5) }} />
        <Grid container spacing={2} marginTop={2}>
            <Grid container xs={12} sm={2} height={"fit-content"} alignItems={"flex-start"} justifyContent={"flex-end"}>

                <Paragraph>
                    {isExpanded ? description : description.slice(0, Number(description.length*0.50))}
                </Paragraph>
                <Button onClick={toggleText} sx={{ marginTop: 2}}>{isExpanded ? 'Read Less' : 'Read More'}</Button>
            </Grid>
            <Grid container xs={12} sm={10} paddingLeft={2}>
                <Grid container >
                    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2}>
                        <FormControl
                            sx={{
                                width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                                marginBottom: theme.spacing(1)
                            }}>
                                <LabelInput>{titleSelectInput}</LabelInput>
                                <Select
                                    IconComponent={KeyboardArrowDown}
                                    value={type}
                                    onChange={(text)=> setType(text.target.value)}
                                    >
                                        {options.map((option, _index) => (
                                            <MenuItem key={_index} value={option.value}>{option.title}</MenuItem>
                                        ))}
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2}>
                        <FormControl
                            sx={{
                                width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
                                marginBottom: theme.spacing(1)
                            }}>
                                <LabelInput>{!hasUnites ? titleAnnualConsumptionInput : `${titleAnnualConsumptionInput} ${unites ? type.length > 0 ? "("+unites.get(type)+")" : "" : ""}`}</LabelInput>
                                <OutlinedInput 
                                        placeholder=""
                                        type='number'
                                        name="annual_consumption"
                                        value={value}
                                        onChange={(text) => setValue(text.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2} alignItems={'self-start'} justifyContent={'center'}>
                        <PrimaryButton
                            disabled={saving}
                            onClick={hangleAddEnergy}
                        >ADD</PrimaryButton>
                    </Grid>
                </Grid>
                <Grid container>
                    {loadingData ? (<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                            <CircularProgress />
                        </Box>) :
                    (<TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {tableHeader.map((val, _index) => (
                                        <TableCell align={_index == 0 ? "left" : "right"} key={_index}>{val}</TableCell>
                                    ))}
                                    <TableCell ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row, _index) => (
                                <TableRow
                                key={_index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                    <TableCell align="right">{row.emission}</TableCell>
                                    <TableCell align="right">{row.uncertainty}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={()=> handleDelete(row)} >
                                            <CancelPresentationOutlined sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length > 0 ?(
                                <TableRow >
                                    <TableCell><strong>total value</strong></TableCell>
                                    <TableCell align="right"><strong>{totalValues}</strong></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"><strong>{totalUncertainty}</strong></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                ) : null}
                            </TableBody>
                            
                        </Table>
                    </TableContainer>)}
                </Grid>

                <Grid container marginTop={5}>
                    <Grid container xs={12} sm={8} paddingLeft={2} paddingRight={2}>
                        <FormControl
                            sx={{
                                width: "100%",
                                marginBottom: theme.spacing(1)
                            }}>
                                <LabelInput>Comments and Notes</LabelInput>
                                <OutlinedInput
                                        type='text'
                                        placeholder="Type your comment here"
                                        value={textComment}
                                        onChange={(text) => setComment(text.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    
                    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2} alignItems={'self-start'} justifyContent={'center'}>
                        <PrimaryButton disabled={savingComment} onClick={addComment}>ADD NOTES</PrimaryButton>
                    </Grid>
                </Grid>
                {
                    loadingComments ? (<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20" }}>
                        <CircularProgress />
                    </Box>):
                    (
                    <Stack spacing={1} marginTop={5} paddingLeft={2} paddingRight={2} sx={{ width: '100%' }}>
                            {comments.map((c) => (
                                <Alert key={c.id} sx={{backgroundColor: "whitesmoke"}}>
                                    <AlertTitle>{c.created_by} - {new Date(c.created_at).toLocaleDateString("en-GB")}</AlertTitle>
                                    {c.text}
                                </Alert>
                            ))}
                    </Stack>
                    )
                }
                
            </Grid>
        
        </Grid>
    </>
}