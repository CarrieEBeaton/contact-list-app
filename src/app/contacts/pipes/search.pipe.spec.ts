import { SearchPipe } from "./search.pipe";
import { ContactMock } from '../services/testing/contact-mock';

describe('SearchPipe', () => {
    let pipe: SearchPipe;
  
    beforeEach(() => {
      pipe = new SearchPipe();
    });

    it('providing Contact Mock and search term returns correct item', () => {
        const selectedContact = pipe.transform(ContactMock.CONTACTS, 'Spark');
        expect(selectedContact[0]).toEqual(ContactMock.CONTACTS[4]);
      });
  });