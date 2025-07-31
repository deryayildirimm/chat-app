export {default} from './Navbar';
// Neden süslü parantez {} ile yazıyoruz? Sadece export default from yazılamaz mı?
// Çünkü bu bir **named export gibi davranan bir re-export ifadesi.
/*
Syntax olarak şöyle okunur:

> export { <içeriden alınacak şey> } from './dosya';

Ve `default` burada **adı `default` olan şeyi al** demek oluyor. 
*/