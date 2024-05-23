import { JoinedStrings } from "../JoinedStrings";
import { InputView } from "../Views/InputView";
import { BasicComponent } from "./BasicComponent";
import { EventSource } from "../Events";
import { ComponentID } from "./ComponentID";

export class FileType {
    static readonly anyImage = new FileType('image/*');
    static readonly anyVideo = new FileType('video/*');
    static readonly anyAudio = new FileType('audio/*');

    static extension(ext: string) { return new FileType(`.${ext}`); }

    private constructor(readonly value: string) {
    }

    toString() { return this.value; }
}

type Events = { valueChanged: File[] };

export class FileInputControl extends BasicComponent {
    private readonly eventSource = new EventSource<Events>(this, { valueChanged: [] as File[] });
    readonly when = this.eventSource.when;

    constructor(protected readonly view: InputView) {
        super(view);
        view.setViewID(ComponentID.nextID());
        view.setType('file');
        view.on('change')
            .execute(this.onInputValueChanged.bind(this))
            .subscribe();
    }

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }

    setCustomValidity(message: string) {
        this.view.setCustomValidity(message);
    }

    private onInputValueChanged() {
        const files = this.getFiles();
        this.eventSource.events.valueChanged.invoke(files);
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

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}