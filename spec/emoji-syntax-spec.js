'use babel';

describe('Emoji Syntax', () => {
   let atomStylesElement = null;
   let activationPromise = null;

   beforeEach(() => {
      atomStylesElement = atom.stylesElement;
      activationPromise = atom.packages.activatePackage('emoji-syntax');
   });

   describe('when the package is activated', () => {
      it('should add an <style> element to the DOM', () => {
         expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeDefined();
      })
   });

   describe('when the package is deactivated', () => {
      beforeEach(() => atom.packages.deactivatePackage('emoji-syntax'));

      it('should remove the <style> element from the DOM', () => {
         expect(atomStylesElement.querySelector('.emoji-syntax-stylesheet')).toBeNull();
      })
   });
});
