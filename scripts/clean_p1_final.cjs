const fs = require('fs');
const path = require('path');

const p1Path = path.join(__dirname, '..', 'src', 'data', 'lessons', 'phase1.js');
let p1 = fs.readFileSync(p1Path, 'utf8');

p1 = p1
  .replaceAll('[ Warrior ]     [ Mage ]', '[ CreditPayment ]     [ DebitPayment ]')
  .replaceAll('Character (Superclass)', 'Payment (Superclass)')
  .replaceAll('Character hero = new Mage(); hero.attack();', 'Payment p = new CreditPayment(); p.process();')
  .replaceAll("invokes the Mage's specific spell attack", "invokes CreditPayment's specific transaction logic")
  .replaceAll('Character hero = new Mage();', 'Payment p = new CreditPayment();')
  .replaceAll('hero.attack()', 'p.process()')
  .replaceAll('Class: Mage', 'Class: CreditPayment')
  .replaceAll('Mage vtable', 'CreditPayment vtable')
  .replaceAll('Mage.attack()', 'CreditPayment.process()')
  .replaceAll('default void rechargeMana()', 'default void logAudit()')
  .replaceAll('Mana recharged to 100%', 'Audit logged')
  .replaceAll('rechargeMana', 'logAudit')
  .replaceAll('Sorcerer', 'StripeProcessor')
  .replaceAll('Lightning Bolt!', 'Payment Captured!')
  .replaceAll('"Excalibur"', '"StandardOrder"')
  .replaceAll('List.of("Warrior", "Mage", "Rogue")', 'List.of("Admin", "Manager", "Analyst")')
  .replaceAll('Party:', 'Roles:')
  .replaceAll('uniqueLoot', 'uniqueRegions')
  .replaceAll('Insufficient Mana!', 'Insufficient Funds!')
  .replaceAll('Spell successfully cast!', 'Transaction successfully processed!')
  .replaceAll('Spell intercepted:', 'Transaction intercepted:')
  .replaceAll('Potion dispensed successfully: Standard Unit', 'Item dispensed successfully: Standard Unit')
  .replaceAll('Potion dispensed successfully', 'Item dispensed successfully');

fs.writeFileSync(p1Path, p1, 'utf8');
console.log('Cleaned phase1 remaining items');
