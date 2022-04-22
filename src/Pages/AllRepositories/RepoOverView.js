import React from 'react';
import { Link, } from "react-router-dom";
import { getRepositoryInfo } from '../../Data/demo.js'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { GoTrashcan } from 'react-icons/go';
import DeleteRepoButton from './DeleteRepo.js'
const sleep = ms => new Promise(r => setTimeout(r, ms));

/*async function DeteleRepo(id) {
    await sleep(Math.round(Math.random() * 2000));
    return Math.random() < 0.5 ? true : false;
}*/

function RepoOverView(props) {
    const [repoInfo, setRepoInfo] = useState(null);
    useEffect(() => {
        getRepositoryInfo(props.repoName).then((data, err) => {
            setRepoInfo(data);
            console.log(data);
        });
    }, []);
    return repoInfo ? (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <Card.Title>{props.repoName}</Card.Title>
                    <Container>
                        <Row>
                            <Col>
                                {repoInfo.dataSetDescription}
                            </Col>
                            <Col>
                                {repoInfo.dataSetLink[0]}
                            </Col>
                        </Row>
                    </Container>
                    <Button variant="primary" onClick={
                        () => window.open('/repositoryInfo/' + props.repoName, '_self')
                    }>Enter</Button>
                    <DeleteRepoButton paperId={repoInfo.id} />
                </Card.Body>
            </Card>
        </React.Fragment >
    ) : (
        <React.Fragment></React.Fragment>
    );
}

export default RepoOverView;
/*
            <div style={{ display: 'inline-flex' }}>
                <Link to={'/repositoryInfo/' + props.repoName}>
                    <h1 className="mt-2">{repoInfo.paperTitle}</h1>
                </Link>
                <DeleteRepoButton paperId={repoInfo.id} />
            </div>
*/