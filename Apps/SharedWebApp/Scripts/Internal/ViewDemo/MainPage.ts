import { ListGroup } from "../../Lib/Components/ListGroup";
import { ModalConfirm } from '../../Lib/Components/ModalConfirm';
import { ModalError } from '../../Lib/Components/ModalError';
import { ModalMessageAlert } from '../../Lib/Components/ModalMessageAlert';
import { ErrorModel } from "../../Lib/ErrorModel";
import { EnumerableRange } from "../../Lib/EnumerableRange";
import { SharedPage } from "../SharedPage";
import { DemoGridListGroupItem } from "./DemoGridListGroupItem";
import { DemoGridListGroupItemView } from "./DemoGridListGroupItemView";
import { MainPageView } from "./MainPageView";

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly demoGridListGroup: ListGroup<DemoGridListGroupItem, DemoGridListGroupItemView>;

    constructor() {
        super(new MainPageView());
        this.demoGridListGroup = new ListGroup(this.view.demoGridListGroup);
        this.demoGridListGroup.registerItemClicked(this.onDemoGridListGroupItemClicked.bind(this));
        this.demoGridListGroup.setItems(
            new EnumerableRange(1, 10).value(),
            (i, itemView) => new DemoGridListGroupItem(i, itemView)
        );
        this.load();
    }

    private async load() {
        const modalConfirm = new ModalConfirm(this.view.modalConfirm);
        const isConfirmed = await modalConfirm.confirm('Confirm this?', 'Confirm');
        if (isConfirmed) {
            const modalAlert = new ModalMessageAlert(this.view.modalAlert);
            modalAlert.alert(a => a.info('Hello!'));
        }
        else {
            const modalError = new ModalError(this.view.modalError);
            modalError.when.errorSelected.then(error => alert(`Error clicked: ${error.Message}`));
            modalError.show(
                [
                    new ErrorModel('Confirm Cancelled'),
                    new ErrorModel('Some other error')
                ],
                'Confirmation Cancelled'
            );
            modalError.show(
                [
                    new ErrorModel('Another Error')
                ],
                'More Errors'
            );
        }
        this.demoGridListGroup.setItems(
            new EnumerableRange(11, 7).value(),
            (i, itemView: DemoGridListGroupItemView) => new DemoGridListGroupItem(i, itemView)
        );
    }

    private onDemoGridListGroupItemClicked(item: DemoGridListGroupItem) {
        alert(`Demo Item Clicked: ${item.displayText}`);
    }
}
new MainPage();