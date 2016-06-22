import RC          from 'riotcontrol'
import UploadEvent from 'events/upload-event'

class uploadAction{
    setFile(file) {
        RC.trigger(UploadEvent.setFile, file);
    }
}

export default new uploadAction();