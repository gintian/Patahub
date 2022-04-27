import $ from 'jquery';
import { useCallback } from 'react';

export async function getGithubRepoInfo(ownerName, repoName){
    return $.get(`https://api.github.com/repos/${ownerName}/${repoName}`);
}
export function parseGithubLink(src){
    const regex = /https\:\/\/github\.com\/(.*?)\/(.*)$/i;
    const matchInfo = src.match(regex);
    if(matchInfo) return [matchInfo[1],matchInfo[2].split('/')[0]];
    else throw 'Invalid link';
}
export function splitGithubLink(src){
    const regex = /https\:\/\/github\.com\/(.*?)\/(.*?)\/(.*)$/i;
    const matchInfo = src.match(regex);
    if(matchInfo) return [matchInfo[1],matchInfo[2],matchInfo[3]];
    else return "error";
}