import { UserPage } from '../../Shared/User/UserPage';
import { Startup } from '../../Shared/Startup';
import { DefaultPageContext } from '../DefaultPageContext';

new DefaultPageContext().load();
new UserPage(new Startup().build(), null);