import riot         from 'riot'
import RC           from 'riotcontrol'
import UploadAction from 'actions/upload-action'
import UploadStore  from 'stores/upload-store'

<image-upload>
    
    <input type="file" name="{ opts.name }" onchange={ setFile } accept="image/*">
    <div class="result"><span><img src="{ result }"/ if={ !!result }></span></div>

    <style scoped>
        .result {
            position: relative;
            width: 450px;
            height: 300px;
            overflow: hidden;
            border: 2px #000 solid;
        }
        .result span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1000%;
            height: 2000px;
            line-height: 2000px;
            margin:-1000px 0 0 -500%;
            text-align: center;
        }
        .result span img {
            min-height: 300px;
            min-width: 10%;
            vertical-align: middle;
        }
    </style>

    <script>
        RC.on(UploadStore.Events.changed, e => {
            this.result = UploadStore.image;
        });

        // file upload
        this.setFile = e => {
            let file = e.target.files[0];
            if (file.size >= 3145728) {
                alert('ファイルサイズは3MBまで');
            } else {
                UploadAction.setFile(file);
            }
        };
    </script>
</image-upload>