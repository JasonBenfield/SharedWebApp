import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../../Lib/MVVM/ReadonlyFormGroup";
import { MvvmPage } from "../../Lib/MVVM/MvvmPage";

const mvvmPage = MvvmPage.get();

class MainPage {

    constructor() {
        const pageView = new MainPageView();
        const pageViewModel = new MainPageViewModel();
        const formGroup = new ReadonlyFormGroup(pageViewModel.formGroup, pageView.formGroupView);
        formGroup.setCaption("Caption 1");
        formGroup.setValue("Value 1");
    }
}

class MainPageView {
    readonly formGroupView: ReadonlyFormGroupView;

    constructor() {
        this.formGroupView = mvvmPage.view.addChildView(new ReadonlyFormGroupView());
    }
}

class MainPageViewModel {
    readonly formGroup = new ReadonlyFormGroupViewModel();
}

new MainPage();