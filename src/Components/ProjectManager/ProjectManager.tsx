import React from "react";
import {NavLink} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import type { ProjectsListType} from './../../store/store';
import NewProjectForm from '../ModalWindows/NewProjectForm';

type storeState = {
    projectsInfoReducer: ProjectsListType[],
}

function ProjectManager () {
    const dispatch = useDispatch()
    let projectsList = useSelector((state: storeState) => state.projectsInfoReducer)
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    console.log(projectsList)
    return (
        <div className="project-manager wrapper">
            <h1 className="project-manager-title">Менеджер проектов</h1>
            <button className="new-project-add" onClick={() => dispatch({type: "toggle_new_project_window_status"})}>Добавить проект</button >
            <div className={isWindowOpened.isNewProjectAdding ? "shadowBack" : ""} onClick={() => dispatch({type: "toggle_new_project_window_status"})}></div>
            {isWindowOpened.isNewProjectAdding  ? <NewProjectForm /> : null}
            <div className="project-list">
                {projectsList.map((project, projectId) => {
                    return <NavLink to={`/project${projectId}`} className="project-list-item">{project.title}</NavLink> 
                })}  
            </div>
        </div>
    )
}

export default ProjectManager