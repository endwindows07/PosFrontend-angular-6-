import { IOptionKey } from "../search-key.interface";
import { Output } from "@angular/core";

export enum TypeProduct {
        อัน = 1,
        ขวด = 2,
        ชิ้น = 3,
        ด้าม = 4,
        เล่ม = 5,
        ห่อ = 6,
        เครื่อง = 7,
        แท่ง = 8,
        ลูก = 9,
        แผ่น = 10,
        เส้น = 11,
}

export class TypeProductList{
        type = TypeProduct;
@Output()        typeItem: IOptionKey[] = [
                { key: this.type.อัน.toString(), value: "อัน" },
                { key: this.type.ขวด.toString(), value: "ขวด" },
                { key: this.type.ชิ้น.toString(), value: "ชิ้น" },
                { key: this.type.ด้าม.toString(), value: "ด้าม" },
                { key: this.type.เล่ม.toString(), value: "เล่ม" },
                { key: this.type.ห่อ.toString(), value: "ห่อ" },
                { key: this.type.เครื่อง.toString(), value: "เครื่อง" },
                { key: this.type.แท่ง.toString(), value: "แท่ง" },
                { key: this.type.ลูก.toString(), value: "ลูก" },
                { key: this.type.แผ่น.toString(), value: "แผ่น" },
                { key: this.type.เส้น.toString(), value: "เส้น" }
        ];

}