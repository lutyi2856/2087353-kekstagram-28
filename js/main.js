import {createFotoDescriptions} from './data.js';
import {renderGallery} from './gallery.js';

const descriptionData = createFotoDescriptions();
renderGallery(descriptionData);
