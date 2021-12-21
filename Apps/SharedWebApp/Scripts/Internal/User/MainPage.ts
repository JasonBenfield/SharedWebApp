import { UserPage } from '../../Shared/User/UserPage';
import { Startup } from '../../Shared/Startup';

new UserPage(new Startup().build(), null);