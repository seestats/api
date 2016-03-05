const expect = require('chai').expect;
const dateHelper = require('../helpers/dateHelper.js');

describe('dateHelper', () => {
  describe('#isValidDate(str)', () => {
    it('returns false if date is not according to parameter dash',
      () => {
        expect(dateHelper.isValidDate('2015/08/08')).to.equal(false);
      }
    );

    it('returns false if date is poorly formatted using only single numbers', () => {
      expect(dateHelper.isValidDate('2015-8-8')).to.equal(false);
    }
    );

    it('returns false if date is poorly formatted using single numbers in day', () => {
      expect(dateHelper.isValidDate('2015-08-8')).to.equal(false);
    }
    );

    it('returns false if date is poorly formatted using single numbers in month', () => {
      expect(dateHelper.isValidDate('2015-8-08')).to.equal(false);
    }
    );

    it('returns false if date is poorly formatted without any separators', () => {
      expect(dateHelper.isValidDate('2015808')).to.equal(false);
    }
    );

    it('returns false if date is left blank', () => {
      expect(dateHelper.isValidDate('')).to.equal(false);
    }
    );

    it('returns false if date is undefined', () => {
      expect(dateHelper.isValidDate(undefined)).to.equal(false);
    }
    );

    it('returns false if date is a string', () => {
      expect(dateHelper.isValidDate('date')).to.equal(false);
    }
    );

    it('returns false if date year is less than 1999', () => {
      expect(dateHelper.isValidDate('date')).to.equal(false);
    }
    );

    it('returns true if date is properly formatted', () => {
      expect(dateHelper.isValidDate('2015-08-05')).to.equal(true);
    }
    );
  });
});
