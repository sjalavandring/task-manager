import React, { useEffect, useState } from 'react'
import uploadedFile from '../../img/uploadedFile.png'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import type {ModalInfoType} from './../../store/store';
import Uploady, { useItemFinishListener } from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import UploadPrewiev from  '@rpldy/upload-preview';
import { finished } from 'stream';

type UploadedFileType = {
    name: string,
    type: string,
    data: any,
    id: number,
}

function NewTaskForm (props: {projectId: number}) {
    const dispatch = useDispatch()
    const taskListInfo = useSelector((state: any) => state.taskInfoReducer[props.projectId].projectInfo)
    let isWindowOpened = useSelector((state: any) => state.modalWindowsReducer)
    let [taskFile, setTaskFile] = useState()
    let [taskTitle, setTaskTitle] = useState('') 
    let [taskDescription, setTaskDescription] = useState('')
    let [taskPriority, setTaskPriority] = useState('')
    const [uploadFinished, setUploadFinished] = useState([] as UploadedFileType[]);

    useEffect(() => {
        console.log(uploadFinished)
    }, [uploadFinished])

    const UploadButtonWithDoneMessage = () => {
        console.log(1)
        useItemFinishListener((item) => {
            setUploadFinished([] as UploadedFileType[])
            setUploadFinished((finished: UploadedFileType[]) =>  {
                return finished.concat({name: `Project${props.projectId}Task${taskListInfo[0].tasks.length + taskListInfo[1].tasks.length + taskListInfo[2].tasks.length + 1}`, type: `${(item.file.type)}`,  data: item.file, id: finished.length});
            })
        });

        if (uploadFinished[0] ) {
            if (uploadFinished[0].type.slice(0, 5) == 'image') {
                return (
                    <>
                        <img src={URL.createObjectURL(uploadFinished[0].data)} alt="uploadFile" />
                        <div key="name" className="upload-imaga__name">Загружено: {uploadFinished[0].name}</div>
                    </>
                )
            } else 
            if (uploadFinished[0].type.slice(0, 5) == 'video') {
                return (
                    <>
                        <video controls src={URL.createObjectURL(uploadFinished[0].data)}></video> 
                        <div key="name" className="upload-imaga__name">Загружено: {uploadFinished[0].name}</div>
                    </>
                )
            } else 
            if (uploadFinished[0].type.slice(0, 5) != ('image' || 'video')) {
                return (
                    <>
                        <img src={uploadedFile} alt="uploadFile" />
                        <div key="name" className="upload-imaga__name">Загружено: {uploadFinished[0].name}</div>
                    </>
                )
            }
        }

        return <></>
    }

    function addNewTask() {
        if (taskTitle != "" && taskPriority != "") {
            if (taskDescription != "") {
                dispatch({type: "add_task", project: props.projectId, description: taskDescription, title: taskTitle, priority: parseInt(taskPriority)})
            } else 
            if (taskDescription == "") {
                dispatch({type: "add_task", project: props.projectId, title: taskTitle, priority: parseInt(taskPriority)})
            }
            if (uploadFinished.length > 0) {
                dispatch({type: "add_new_task_files", files: uploadFinished})
            }
            dispatch({type: "toggle_new_task_window_status"})
        } else {
            alert("Неверно введены данные")
        }
    }

    return (
        <form className={"new-task-form " + (isWindowOpened.isNewTaskAdding ? "" : "inactive")}>
            <Uploady destination={{url: "http://localhost:3001/select", params: {name: `Project${props.projectId}Task${taskListInfo[0].tasks.length + taskListInfo[1].tasks.length + taskListInfo[2].tasks.length + 1}`}}}>
                <div className="new-task-form-block">
                    <input className="new-task-form__item" type="text" placeholder="Имя задачи (до 30 символов)" pattern="[A-Za-zА-Яа-яЁё\s]{1,30}" onChange={(element) => setTaskTitle((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                    <input className="new-task-form__item" type="text" placeholder="Приоритет (от 1 до 3, где 1 - наибольший приоритет)" pattern="[1-3]" onChange={(element) => setTaskPriority((element.target.value).search(element.target.pattern) != -1 ? element.target.value : '')} required/>
                </div>
                <div className="new-task-form-block">
                    <textarea className="new-task-form__item new-task-form__textarea" maxLength={300}  placeholder="Описание задачи (до 300 символов)" onChange={(element) => setTaskDescription(element.target.value != '' ? element.target.value : "Описание не добавлено")}/>
                    <div className="new-task-form__item upload-image-block">
                        <UploadButton>Загрузить файл</UploadButton>
                        <div className="upload-image-container">
                            <UploadPrewiev loadFirstOnly={true} videoMimeTypes={undefined} PreviewComponent={UploadButtonWithDoneMessage}/>
                        </div>
                    </div>
                </div>
                <div className="new-task-form-block">
                    <button className='new-task-form__item submit_button' type="submit" onClick={() => {addNewTask()}}>Создать задачу</button>
                </div>
            </Uploady>
        </form> 
    )
}

export default NewTaskForm;