import { AsyncCommand } from '../../Lib/Components/Command';
import { FileInputControl, FileType } from '../../Lib/Components/FileInputControl';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { TextLinkComponent } from '../../Lib/Components/TextLinkComponent';
import { DateOnly } from '../../Lib/DateOnly';
import { DateTimeOffset } from '../../Lib/DateTimeOffset';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { CustomUserMenu } from './CustomerUserMenu';
import { MainPageView } from './MainPageView';

class MainPage extends SharedPage {
    private readonly fileInput: FileInputControl;
    private readonly link: TextLinkComponent;

    constructor(protected readonly view: MainPageView) {
        super(view);
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
        return new CustomUserMenu(this.sharedClient, this.view.userMenu);
    }

    private upload() {
        return this.sharedClient.Employee.AddProduct({
            Name: 'Whatever',
            Quantity: 1,
            Price: 1.23,
            File: this.fileInput.getFiles()[0],
            TimeAdded: DateTimeOffset.now(),
            Nested: { MoreFiles: this.fileInput.getFiles() }
        });
    }
}
new DefaultPageContext().load();
new MainPage(new MainPageView());