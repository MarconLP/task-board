import '../../../../styles/AddAttributePopover.css'
import { toast } from 'react-hot-toast'
import { Popover } from '@mui/material'
import { ObjectId } from '../../../../utils'
import { useAddAttributeMutation } from '../../../../modules/services/boardSlice'

function AddAttributePopover(props) {
    const [addAttribute] = useAddAttributeMutation()

    const handleClose = () => {
        props.close()
    }

    const handleNewColumn = async type => {
        handleClose()
        if (!['status', 'text', 'people'].includes(type)) {
            toast('Coming soon')
            return
        }
        addAttribute({
            boardId: props.boardId,
            type,
            _id: ObjectId()
        })
    }

    return (
        <Popover
            className="AddAttributePopover"
            open={Boolean(props.anchor)}
            anchorEl={props.anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <div className="content">
                <div>
                    <p>Essentials</p>
                    <div>
                        <div>
                            <div onClick={() => handleNewColumn('status')}>
                                <i className="fas fa-bars"> </i>Status
                            </div>
                            <div onClick={() => handleNewColumn('text')}>
                                <i className="fas fa-font"> </i>Text
                            </div>
                            <div onClick={() => handleNewColumn('people')}>
                                <i className="far fa-user-circle"> </i>People
                            </div>
                        </div>
                        <div>
                            <div onClick={() => handleNewColumn('dropdown')}>
                                <i className="fas fa-tag"> </i>Dropdown
                            </div>
                            <div onClick={() => handleNewColumn('date')}>
                                <i className="far fa-calendar"> </i>Date
                            </div>
                            <div onClick={() => handleNewColumn('number')}>
                                <i className="fas fa-hashtag"> </i>Numbers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    )
}

export default AddAttributePopover
