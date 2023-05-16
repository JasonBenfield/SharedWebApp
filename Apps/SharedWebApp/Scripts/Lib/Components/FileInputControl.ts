import { JoinedStrings } from "../JoinedStrings";
import { InputView } from "../Views/InputView";
import { BasicComponent } from "./BasicComponent";

export class FileType {
    static readonly anyImage = new FileType('image/*');
    static readonly anyVideo = new FileType('video/*');
    static readonly anyAudio = new FileType('audio/*');

    static extension(ext: string) { return new FileType(`.${ext}`); }

    private constructor(readonly value: string) {
    }

    toString() { return this.value; }
}

export class FileInputControl extends BasicComponent {
    constructor(protected readonly view: InputView) {
        super(view);
        view.setType('file');
    }

    allowMultiple() { this.view.allowMultiple(); }

    preventMultiple() { this.view.preventMultiple(); }

    acceptFileTypes(...fileTypes: (string | FileType)[]) {
        let accept: string;
        if (fileTypes && fileTypes.length > 0) {
            accept = new JoinedStrings(',', fileTypes).value();
        }
        else {
            accept = '';
        }
        this.view.setAccept(accept);
    }

    getFiles() {
        return this.view.getFiles();
    }

    clear() {
        this.view.setValue('');
    }
}