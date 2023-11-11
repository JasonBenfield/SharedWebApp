import { AppClientAction } from '../../Lib/Http/AppClientAction';
import { AppClientEvents } from '../../Lib/Http/AppClientEvents';
import { AppResourceUrl } from '../../Lib/Http/AppResourceUrl';
import { AsyncCommand } from '../../Lib/Components/Command';
import { FileInputControl, FileType } from '../../Lib/Components/FileInputControl';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { TextLinkComponent } from '../../Lib/Components/TextLinkComponent';
import { UserMenuComponent } from '../../Lib/Components/UserMenuComponent';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { CustomUserMenu } from './CustomerUserMenu';
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

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly fileInput: FileInputControl;
    private readonly link: TextLinkComponent;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Card Demo');
        this.fileInput = new FileInputControl(this.view.fileInput);
        this.fileInput.allowMultiple();
        this.fileInput.acceptFileTypes(FileType.anyImage);
        const uploadCommand = new AsyncCommand(this.upload.bind(this));
        uploadCommand.add(this.view.uploadButton);
        this.link = new TextLinkComponent(this.view.linkView);
        this.link.setHref('https://developer.mozilla.org');
        this.link.setTargetToBlank();
    }

    protected createUserMenu() {
        return new CustomUserMenu(this.defaultClient, this.view.userMenu);
    }

    private upload() {
        const action = new AppClientAction<IAddProductModel, {}>(
            new AppClientEvents(() => { }),
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