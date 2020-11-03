Select * 
from (select Product,Count(*)as qtd1, avg(UnitCostReal) as a,max(UnitCostReal)as b,min(UnitCostReal)as c
from PingoDoceInvoice
Group by Product)T
where T.qtd1>1
and a<>b
and a<>c
and b<>c
order by 1
