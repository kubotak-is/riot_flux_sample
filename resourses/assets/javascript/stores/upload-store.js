import riot        from 'riot'
import RC          from 'riotcontrol'
import UploadEvent from 'events/upload-event'
import loadImage   from 'blueimp-load-image'

class uploadStore{
    constructor() {
        riot.observable(this);
        this.image = null;
        this.on(UploadEvent.setFile, this._setFile.bind(this));
    }

    _setFile(file) {
        this.image = loadImage.createObjectURL(file);
        RC.trigger(this.Events.changed);
    }
};

const store = new uploadStore();
store.Events = { changed: "UPLOAD_STORE_CHANGED" };

RC.addStore(store);

export default store;