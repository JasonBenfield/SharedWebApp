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
import { DefaultPageContext } from "../DefaultPageContext";

class MainPage extends SharedPage {
    private readonly demoGridListGroup: ListGroup<DemoGridListGroupItem, DemoGridListGroupItemView>;
    private readonly modalError: ModalError;

    constructor(protected readonly view: MainPageView) {
        super(view);
        this.modalError = new ModalError(view.modalError);
        this.demoGridListGroup = new ListGroup(view.demoGridListGroup);
        this.demoGridListGroup.when.itemClicked.then(this.onDemoGridListGroupItemClicked.bind(this));
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
                    new ErrorModel('This has a caption', 'Another Error'),
                    new ErrorModel('Error with no caption')
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
new DefaultPageContext().load();
new MainPage(new MainPageView());