import {BasePlugin} from "@uppy/core";
import {Uppy} from "@uppy/core";
import {getPathForUpload} from "../fileExplorer/modals/ExplorerModalContext";
import {setUploadDirectory} from "../../services/FileAPI";

export default class FileTargetPlugin extends BasePlugin<{}>{

    constructor(uppy: Uppy, opts: {}) {
        super(uppy, opts);
        this.id = 'FileTargetPlugin'
        this.type = 'example'
    }

    async setFileTarget(){
        setUploadDirectory(getPathForUpload()).catch(() => {
            console.log('Error: Could not set new UploadDirectory')
        })
    }

    install(){
        this.uppy.addPreProcessor(this.setFileTarget)
    }

    uninstall(){
        this.uppy.removePreProcessor(this.setFileTarget)
    }
}