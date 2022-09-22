import { AppApiAction } from '../../Lib/Api/AppApiAction';
import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { BasicPage } from '../../Lib/Components/BasicPage';
import { AsyncCommand } from '../../Lib/Components/Command';
import { FileInputControl, FileType } from '../../Lib/Components/FileInputControl';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';

interface IAddProductModel {
    Name: string;
    Quantity: number;
    Price: number;
    File: File;
    TimeAdded: Date;
    Nested: IAddProductNested;
}

interface IAddProductNested {
    MoreFiles: File[];
}

class MainPage extends BasicPage {
    protected readonly view: MainPageView;
    private readonly fileInput: FileInputControl;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Card Demo');
        this.fileInput = new FileInputControl(this.view.fileInput);
        this.fileInput.allowMultiple();
        this.fileInput.acceptFileTypes(FileType.anyImage);
        const uploadCommand = new AsyncCommand(this.upload.bind(this));
        uploadCommand.add(this.view.uploadButton);
    }

    private upload() {
        const action = new AppApiAction<IAddProductModel, {}>(
            new AppApiEvents(() => { }),
            AppResourceUrl.app(
                'Shared',
                '',
                pageContext.CacheBust
            )
                .withGroup('Employee'),
            'AddProduct',
            'AddProduct'
        );
        const request: IAddProductModel = {
            Name: 'Whatever',
            Quantity: 1,
            Price: 1.23,
            File: this.fileInput.getFiles()[0],
            TimeAdded: new Date(),
            Nested: { MoreFiles: this.fileInput.getFiles() }
        };
        return action.execute(request, {});
    }
}
new DefaultPageContext().load();
new MainPage();