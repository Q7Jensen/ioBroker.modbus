import clsx from 'clsx';
import { tsv2json, json2tsv } from 'tsv-json';

import I18n from '@iobroker/adapter-react/i18n';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Textfield from '@material-ui/core/Textfield';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const RegisterTable = props => {
    const exportTsv = () => {
        let tsvResult = [];
        tsvResult.push(props.fields.map(field => field.name))
        props.data.forEach(item => tsvResult.push(Object.values(item).map(value => value.toString())))
        console.log(tsvResult)
        console.log(json2tsv(tsvResult))
    }

    const importTsv = () => {

    }

    return <form className={ props.classes.tab }>
            <div>
                <IconButton onClick={e => props.addItem()}>
                    <AddIcon/>
                </IconButton>
                <IconButton onClick={exportTsv}>
                    <SaveIcon/>
                </IconButton>
                <IconButton>
                    <FolderOpenIcon/>
                </IconButton>
            </div>
            <div className={clsx(props.classes.column, props.classes.columnSettings) }>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            {props.fields.map(field => 
                                <TableCell key={field.name}><b>{I18n.t(field.title)}</b></TableCell>
                            )}
                            <TableCell/>
                        </TableRow>
                        {
                            props.data.map((item, index) => 
                                <TableRow key={index}>
                                    {props.fields.map(field => 
                                        <TableCell key={field.name}>{
                                            (() => {
                                                if (field.type === 'checkbox') {
                                                    return <Checkbox 
                                                        checked={!!item[field.name]}
                                                        onChange={e => props.changeParam(index, field.name, e.target.checked)}
                                                    />
                                                }
                                                if (field.type === 'select') {
                                                    return <Select
                                                        style={{width: 200}}
                                                        value={item[field.name]} 
                                                        onChange={e => props.changeParam(index, field.name, e.target.value)}
                                                    >
                                                        {field.options.map(option => 
                                                            <MenuItem key={option.value} value={option.value}>{option.title ? I18n.t(option.title) : <i>{I18n.t('Nothing')}</i>}</MenuItem>
                                                        )}
                                                    </Select>
                                                }
                                                return <Textfield value={item[field.name]} style={{border: '0', width: '100%'}}
                                                    onChange={e => props.changeParam(index, field.name, e.target.value)}
                                                />
                                            })()
                                        }</TableCell>
                                    )}
                                    <TableCell>
                                        <IconButton onClick={e => props.deleteItem(index)}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </form>;
}

export default RegisterTable