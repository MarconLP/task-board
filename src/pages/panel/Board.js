import {useCallback, useEffect} from 'react'
import '../../styles/Board.css'
import TaskGroup from './board/TaskGroup'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {LinearProgress} from "@material-ui/core";
import NewTaskGroup from "./board/NewTaskGroup";
import useToggleState from "../../modules/hooks/useToggleState";
import {useDispatch, useSelector} from "react-redux";
import { fetchBoard, sortAttribute, sortTask, sortTaskGroup } from "../../modules/state/reducers/boardReducer";

function Board(props) {
    const { workspace } = useSelector(state => state.workspace)
    const { board, loading } = useSelector(state => state.board)
    const dispatch = useDispatch()

    const [newTaskGroupShown, toggleNewTaskGroupShown] = useToggleState(false)

    const findBoardId = useCallback(() => {
        const space = props.match.params.space.replaceAll('-', ' ')
        const board = props.match.params.board.replaceAll('-', ' ')
        return workspace?.spaces.find(x => x.name === space).boards.find(x => x.name === board)._id
    }, [props.match.params.space, props.match.params.board, workspace?.spaces, workspace])
    const boardId = findBoardId()

    const onDragStart = () => {
        const [body] = document.getElementsByTagName('body')
        body.style.cursor = 'pointer'
    }

    const handleDragEnd = async (result) => {
        const [body] = document.getElementsByTagName('body')
        body.style.cursor = 'auto'
        if (result.destination === null ||
            (result.destination.index === result.source.index
                && result.destination.droppableId === result.source.droppableId)) return
        if (result.type === "task") {
            dispatch(sortTask({ result }))
        } else if (result.type === "taskgroup") {
            dispatch(sortTaskGroup({ result }))
        } else if (/^attribute /gm.test(result.type)) {
            dispatch(sortAttribute({ result }))
        }
    }

    useEffect(() => {
        if (!boardId) return
        dispatch(fetchBoard(boardId))
    }, [boardId])

    return (
        <div>
            {loading > 0 ? <LinearProgress/> : <div className="loading-placeholder"></div>}
            {board && (
                <DragDropContext onDragEnd={handleDragEnd} onDragStart={onDragStart}>
                    <Droppable droppableId="taskgroups" type="taskgroup">
                        {(provided) => (
                            <div className="task-group" {...provided.droppableProps} ref={provided.innerRef}>
                                {board.taskGroups.map((taskGroup, i) => {
                                    return <TaskGroup
                                        key={taskGroup._id}
                                        taskGroup={taskGroup}
                                        index={i}/>
                                })}
                                {newTaskGroupShown && (
                                    <NewTaskGroup
                                        attributes={board.attributes}
                                        index={board.taskGroups.length}
                                        toggleNewTaskGroup={toggleNewTaskGroupShown}
                                        boardId={board._id}/>
                                )}
                                {provided.placeholder}
                                <div className="add-task-group">
                                    <div></div>
                                    <button onClick={toggleNewTaskGroupShown}>ADD NEW TASKGROUP</button>
                                    <div></div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
}

export default Board