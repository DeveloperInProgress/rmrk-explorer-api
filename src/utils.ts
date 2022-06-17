export function numberOfSales(ownerList: string[]): number {
    const origList = ownerList;
    ownerList.shift();
    const sales = ownerList.map((owner, i)=>{
        return owner === ownerList[i-1] ? 0 : 1;
    }).reduce((sum, toAdd) => sum + toAdd, 0);
    return sales;
}
