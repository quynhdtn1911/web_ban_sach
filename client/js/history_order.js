var user_id = '6275cc19536d5f1a2beef43c'
var user_id = $.cookie(user_id)
var order_info = $("#history_order_info")
var btnTroLai = $("#btnDelete")
var btnDatHang = $("#btnBuy")
var txtTotal = $("#total")
var cart_price = $("#cart_price")
var cart_count = $("#cart_count")
var id_order
var tienship = 0
var t = 0
var c_c = 0
var tong = 0

$('#tienship').change(function(){
    tienship = $('#tienship :selected').val()
    if($('#tienship :selected').val() != ''){
        $("#ship").show()
        $("#total_price").show()
        tong = t + Number(tienship)
        $("#tien_ship").html(tienship)
        $("#ship").html('<div class="order_total_title">Tiền ship:</div> <div class="order_total_amount">'+tienship+'</div>')
        $("#total_price").html('<div class="order_total_title">Tổng cộng:</div> <div class="order_total_amount">'+tong+'</div>')
    }else{
        $("#tien_ship").html(tienship)
        $("#ship").hide()
        $("#total_price").hide()   
    }
    
});

$.ajax({  
    url: `http://localhost:5000/order/${user_id}/getHistoryOrder`,
    method:'get',   
    dataType: 'json',
    success:function(response){  
        if(response){  
            var htmlOrder = ``
            var data = response.data
            const localhost_url = ''
            t = 0
            c_c = 0
            for(const order of data){
                
            let d = new Date(order.updatedAt)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            let ngayMua = day + "/" + month +"/"+ year
                for(const book_order of order.bookOrders){
                    let image = localhost_url + (book_order.book.image ? book_order.book.image  : 'default_book_img.jpg')
                    let total = book_order.book.price*book_order.quantity
                    t += total
                    c_c += book_order.quantity
                    htmlOrder += `<li class="cart_list_item">
                        <div class="cart_item clearfix">
                            <div class="cart_item_image"><img src=${image} alt=""></div>
                            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                <div class="cart_item_name cart_info_col">
                                    <div class="cart_item_title">Tên sách</div>
                                    <div class="cart_item_text">${book_order.book.name}</div>
                                </div>
                                <div class="cart_item_quantity cart_info_col">
                                    <div class="cart_item_title">Số lượng</div>
                                    <div class="cart_item_text">${book_order.quantity}</div>
                                </div>
                                <div class="cart_item_price cart_info_col">
                                    <div class="cart_item_title">Giá</div>
                                    <div class="cart_item_text">${book_order.book.price}</div>
                                </div>
                                <div class="cart_item_address cart_info_col">
                                    <div class="cart_item_title">Ngày mua</div>
                                    <div class="cart_item_text">${ngayMua}</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_title">Tổng tiền</div>
                                    <div class="cart_item_text">${total}</div>
                                </div>
                            </div>
                        </div>
                    </li>`
                }
            }
            order_info.html(htmlOrder)
            btnTroLai.on('click', () => {  
            })
            btnDatHang.on('click',() => {

                var txtAddress =$("#address").val()
                if(txtAddress == "" || $('#tienship :selected').val() == ""){
                    alert("Bạn cần nhập địa chỉ và chọn vận chuyển")
                }else{
                    $.ajax({  
                        url:`http://localhost:5000/order/${id_order}/update`,  
                        method:'put',   
                        data: {
                            "address": txtAddress,
                            "totalPrice": tong,
                            "status": 1
                        },
                        dataType: 'json', 
                        success:function(response){  
                            if(response){  
                                location.reload()
                            }else{  
                                alert('some error occurred try again');  
                            }  
                        },  
                        error:function(response){  
                            alert('server error occured')  
                        }  
                    });
                    window.location="../client/history_order.html"
                }
            })
        }else{  
            alert('some error occurred try again');  
        }  
    },  
    error:function(response){  
        
        alert('server error occured')  
    }  
});  