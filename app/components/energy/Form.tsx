import {Alert, AlertTitle, Box, Button, FormControl, Grid, IconButton, MenuItem, OutlinedInput, Select, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import Divider from '@mui/material/Divider';
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/system";
import { CancelPresentationOutlined, KeyboardArrowDown } from '@mui/icons-material';
import { Energy } from "@/app/models/Energy/Energy";
import { Option } from "@/app/models/Select/Option";
import { useEffect, useState } from "react";
import { generateUuid } from "@/app/helpers/uuid";
import { Comment } from "@/app/models/Energy/Comment";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationDialog from "../ConfirmationDialog";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from "react-i18next";


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
    text-align: left;
    font-size: 14px;
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

    const [open, setOpen] = useState(false);

    const {t} = useTranslation();
    const hangleAddEnergy = async () => {
        if(type && value){
            if(Number(value)){
                const existValues = data.filter((e) => e.type == type);
                if(existValues.length > 0 ){
                    handleOpen();
                    return;
                }
                addEnergy();
                return;
            }
        }
        alert("Ajouter une valeur");
        
    }

    const addEnergy = async () => {
        setOpen(false);
        setSaving(true);
        await handleAdd(new Energy(generateUuid(), type, Number(value), category));
        setType("");
        setValue("");
        setSaving(false);
        return;
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

        data.sort((a:Energy, b:Energy) => {
            const typeA = a.type.toUpperCase(); // ignore upper and lowercase
            const typeB = b.type.toUpperCase(); // ignore upper and lowercase
            if (typeA < typeB) {
              return -1;
            }
            if (typeA > typeB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
    }, [data]);
    
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOpen = () => {
        setOpen(true);

    };
  
    const handleClose = () => {
        setType("");
        setValue("");
        setOpen(false);
    };

    const prepareValueForTranslation = (value: string) => {
        let newValue;

        newValue = value.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/\s/g, "")
                .replace(/-\([^)]*\)$/, "");

        return t('abc-'+newValue);

    }

    return <>
        <Dialog
            open={open}
            keepMounted={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmation"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {`Une donnée d'activité existe déjà pour ${type} , voulez-vous quand même enregistrer une nouvelle donnée ? `}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus color="primary">
                    Non
                </Button>
                <Button onClick={addEnergy} color="secondary">Oui</Button>
            </DialogActions>
        </Dialog>
        <h4>{t('abc-energy').toUpperCase()} - {t('abc-'+category).toUpperCase()}</h4>
        <Divider aria-hidden="true" sx={{ marginTop: theme.spacing(5) }} />
        <Grid container spacing={2} marginTop={2}>
            <Grid container xs={12} sm={2} height={"fit-content"} alignItems={"flex-start"} justifyContent={"flex-end"}>

                <Paragraph>
                    {isExpanded ? description : description.slice(0, Number(description.length*0.50))}
                </Paragraph>
                <Button onClick={toggleText} sx={{ marginTop: 2}}>{isExpanded ? t('abc-read-less') : t('abc-read-more')}</Button>
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
                        >{t('abc-add')}</PrimaryButton>
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
                                        {prepareValueForTranslation(row.type)}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                    <TableCell align="right">{row.emission}</TableCell>
                                    <TableCell align="right">{row.uncertainty}</TableCell>
                                    <TableCell align="right">
                                        
                                        <ConfirmationDialog
                                            title="Confirmation"
                                            description="Souhaitez-vous supprimer définitivement cette donnée ?"
                                            response={()=> {
                                                console.log('Confirmed!', row.id);
                                                handleDelete(row)
                                            }}
                                            >
                                            {(showDialog:any) => (
                                                <IconButton onClick={showDialog} >
                                                    <CancelPresentationOutlined sx={{color: "red"}}/>
                                                </IconButton>
                                            )}
                                        </ConfirmationDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length > 0 ?(
                                <TableRow >
                                    <TableCell><strong>{t('abc-total-value')}</strong></TableCell>
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
                                <LabelInput>{t('abc-comments-notes')}</LabelInput>
                                <OutlinedInput
                                        type='text'
                                        placeholder={t('abc-type-your-comments-here')}
                                        value={textComment}
                                        onChange={(text) => setComment(text.target.value)}
                                />
                        </FormControl>
                    </Grid>
                    
                    <Grid container xs={12} sm={4} paddingLeft={2} paddingRight={2} alignItems={'self-start'} justifyContent={'center'}>
                        <PrimaryButton disabled={savingComment} onClick={addComment}>{t('abc-add-notes')}</PrimaryButton>
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