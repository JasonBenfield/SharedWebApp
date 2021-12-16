import { Startup } from 'xtistart';
import { UserPage } from '../../Shared/User/UserPage';

new UserPage(new Startup().build(), null);