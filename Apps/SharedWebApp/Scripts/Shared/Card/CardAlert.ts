import { BlockViewModel } from "../Html/BlockViewModel";
import { MessageAlert } from "../MessageAlert";
import { CardBody } from "./CardBody";

export class CardAlert extends CardBody {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.hide();
        this.alert.messageChanged.register(this.onMessageChanged.bind(this));
    }

    readonly alert = this.addContent(new MessageAlert());

    private onMessageChanged(message: string) {
        if (message) {
            this.show();
        }
        else {
            this.hide();
        }
    }
}