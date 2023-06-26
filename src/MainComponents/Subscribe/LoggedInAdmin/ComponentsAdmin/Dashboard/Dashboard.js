import './Dashboard.css';
import { FcSalesPerformance } from "react-icons/fc";
import { BsBagCheckFill } from "react-icons/bs";
import { BsBasket3Fill } from "react-icons/bs";

export default function Dashboard({setShowErrorModal}) {

    return (
        <div className='DashboardContainer-0'>
            <div className='DashboardContainer'>
                <div className='DashboardHeader'>
                    <div className='DashboardTotalSales'>
                        <div className='DashboardTotalSalesIcon'>
                            <FcSalesPerformance/>
                        </div>
                        <div className='DashboardText'>
                            <div>Total Sales</div>
                            <div>$ 2588</div>
                        </div>
                    </div>
                    <div className='DashboardTotalOrders'>
                        <div className='DashboardTotalOrdersIcon'>
                            <BsBagCheckFill/>
                        </div>
                        <div className='DashboardText'>
                            <div>Total Orders</div>
                            <div>588</div>
                        </div>
                    </div>
                    <div className='DashboardTotalProducts'>
                        <div className='DashboardTotalProductsIcon'>
                            <BsBasket3Fill/>
                        </div>
                        <div className='DashboardText'>
                            <div>Total Products</div>
                            <div>588</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
  }
  