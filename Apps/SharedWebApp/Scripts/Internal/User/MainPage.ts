import { UserPage } from '../../Lib/User/UserPage';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';

new DefaultPageContext().load();
new UserPage(null);