import styles from '../../../../../styles/TaskModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react'
import CommentPopover from './comment/CommentPopover'
import { useEditTaskCommentMutation } from '../../../../../modules/services/boardSlice'
import Editor from '../../../../../utils/Editor'

function Comment({ comment, taskId }) {
    const [editing, setEditing] = useState(false)
    const [editTaskComment] = useEditTaskCommentMutation()

    const getTime = x => x

    const handleSave = editor => {
        editTaskComment({
            taskId,
            commentId: comment._id,
            content: editor.getJSON()
        })
        editor.commands.clearContent()
        setEditing(false)
    }

    return (
        <div className={styles.comment}>
            <div className={styles.author}>
                <div>{comment.author.substring(0, 2).toUpperCase()}</div>
            </div>
            <div className={styles.commentBody}>
                {editing ? (
                    <div>
                        <Editor
                            saveComment={handleSave}
                            cancelEditing={() => setEditing(false)}
                            type="comment-edit"
                            content={comment.content}
                        />
                    </div>
                ) : (
                    <div>
                        <div className={styles.commentHeader}>
                            <p>
                                <span className={styles.authorSpan}>
                                    {comment.author}
                                </span>
                                <span> commented</span>
                            </p>
                            <p className={styles.date}>
                                {getTime(comment.timestamp)}
                            </p>
                            <div className={styles.actions}>
                                <div onClick={() => setEditing(true)}>
                                    <FontAwesomeIcon icon={solid('pen')} />
                                    <span>Edit</span>
                                </div>
                                <CommentPopover
                                    taskId={taskId}
                                    commentId={comment._id}
                                />
                            </div>
                        </div>
                        <Editor
                            type="comment"
                            readOnly={true}
                            content={comment.content}
                        />
                        <div className={styles.commentFooter}>
                            <div className={styles.like}>Like</div>
                            <div className={styles.reply}>Reply</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment
