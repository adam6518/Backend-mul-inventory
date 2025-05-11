class orderModel {
    constructor(order) {
        this.itemPekerjaan = order.itemPekerjaan
        this.namaProject = order.namaProject
        this.volumeBq = order.volumeBq
        this.qtyReject = order.qtyReject
        this.qtyOrder = order.qtyOrder
        this.tanggalChecklist = order.tanggalChecklist
        this.tahapan = order.tahapan
    }
}

export default orderModel