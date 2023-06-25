import React from 'react';
import './App.scss';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProjectManager from './Components/ProjectManager/ProjectManager';
import TaskManager from './Components/TaskManager/TaskManager';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import type { ProjectsListType} from './store/store';

type storeState = {
    projectsInfoReducer: ProjectsListType[],
}

function App() {
  const projectsList = useSelector((state: storeState) => state.projectsInfoReducer)
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProjectManager/>} />
            {projectsList.map((project, projectId) => {
              return <Route path={`/project${projectId}`} element={<TaskManager projectId={projectId}/>} />
            })}
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </main>
  );
}

export default App;
