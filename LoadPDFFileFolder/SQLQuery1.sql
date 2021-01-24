Select * 

from (select Product,Count(*)as qtd1, avg(UnitCostReal) as a,max(UnitCostReal)as b,min(UnitCostReal)as c

from PingoDoceInvoice

Group by Product)T

order by 2 desc,1
