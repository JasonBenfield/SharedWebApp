import { ListGroupComponent } from "../../Lib/Components/ListGroupComponent";
import { EnumerableRange } from "../../Lib/Enumerable";
import { DemoGridListGroupItem } from "./DemoGridListGroupItem";
import { DemoGridListGroupItemView } from "./DemoGridListGroupItemView";
import { MainPageView } from "./MainPageView";
import { ModalMessageAlert } from '../../Lib/Components/ModalMessageAlert';

class MainPage {
    constructor() {
        const view = new MainPageView();    
        const demoGridListGroup = new ListGroupComponent(view.demoGridListGroup);
        demoGridListGroup.registerItemClicked(this.onDemoGridListGroupItemClicked.bind(this));
        demoGridListGroup.setItems(
            new EnumerableRange(1, 10).value(),
            (i, itemView: DemoGridListGroupItemView) => new DemoGridListGroupItem(i, itemView)
        );
        const modalAlert = new ModalMessageAlert(view.modalAlert);
        modalAlert.alert(a => a.info('Hello!'));
    }

    private onDemoGridListGroupItemClicked(item: DemoGridListGroupItem) {
        alert(`Demo Item Clicked: ${item.displayText}`);
    }
}
new MainPage();