import { MvvmPage } from "../../Lib/MVVM/MvvmPage";
import { ReadonlyFormGroup, ReadonlyFormGroupView, ReadonlyFormGroupViewModel } from "../../Lib/MVVM/ReadonlyFormGroup";

const mvvmPage = MvvmPage.get();

class MainPage {

    constructor() {
        const pageView = new MainPageView();
        const pageViewModel = new MainPageViewModel();
        const formGroup = new ReadonlyFormGroup(pageViewModel.formGroup, pageView.formGroupView);
        formGroup.setCaption("Caption 1");
        formGroup.setValue("Value 1");
        mvvmPage.show();
    }
}

class MainPageView {
    readonly formGroupView = ReadonlyFormGroupView.create();

    constructor() {
        mvvmPage.view.addChildView(this.formGroupView);
    }
}

class MainPageViewModel {
    readonly formGroup = new ReadonlyFormGroupViewModel();
}

new MainPage();