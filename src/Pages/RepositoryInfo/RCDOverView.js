import React from 'react';
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import GithubRepoInfo from "../Utilities/GithubRepoInfo/GithubRepoInfo.js"
// import "./RCDOverView.css";
import { BsFillTrashFill, BsSaveFill } from 'react-icons/bs';
import { GoX, GoPlus, GoCheck } from 'react-icons/go';
import { RiEditFill } from 'react-icons/ri';
import { getDatasetById } from '../../Data/dataset.js';
import { getCodesetById } from '../../Data/codeset.js';
import { getResultLink } from '../../Data/rcd.js';

function RCDOverView(props){
    // props.RCD must have keys {RCD}
    const delRCD = () => {
        props.onRemove(props.RCD.rcd_id);
    }
    const [codesetLink, setCodeSetLink] = useState('');
    const [datasetLink, setDataSetLink] = useState('');
    const [resultLink, setResultLink] = useState('');

    useEffect( () => {
        getDatasetById(props.RCD.dataset_id).then((data, err) => {
            if(data.length>0)setDataSetLink(data[0].dataset_link);
            else throw (err || 'error no valid dataset');
        });
        getCodesetById(props.RCD.codeset_id).then((data, err) => {
            if(data.length>0)setCodeSetLink(data[0].codeset_link);
            else throw (err || 'error no valid codeset');
        });
        getResultLink(props.RCD.result_id).then((data, err) => {
            if (err) throw err;
            setResultLink(data);
        });
    },[]);
    
    return (
        <Row>
            <Col>
                <Link to={`/RCDInfo/${props.repoName}/${props.RCD.rcd_id}`}>
                    <Image src={resultLink} style={{height: '50px'}} />
                </Link> 
            </Col>
            <Col>
                <GithubRepoInfo link={codesetLink}>somecode</GithubRepoInfo>
            </Col>
            <Col>
                <GithubRepoInfo link={datasetLink}>somedata</GithubRepoInfo>              
            </Col>
            {
                props.needEdit ? (
                <Col>
                    <Button onClick={()=>props.onEdit(props.RCD)} className="btn-sm"><RiEditFill /></Button>
                    <Button onClick={delRCD} className="btn-sm btn-danger"><BsFillTrashFill/></Button>
                </Col>)
            : <React.Fragment/>
            }
        </Row>
    )
}
export default RCDOverView;