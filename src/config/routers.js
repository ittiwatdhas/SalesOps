import Vue from "vue";
import Router from "vue-router";

const CoreLogin = () => import("@/components/core/Login");
const CoreAbout = () => import("@/components/core/About");
const CoreSetting = () => import("@/components/core/MoreSettings");
const CoreAccount = () => import("@/components/core/Account");
const CoreUsermanage = () => import("@/components/core/Usermanage");
const CoreCustmanage = () => import("@/components/core/Custmanage");
const CoreOptionlabel = () => import("@/components/core/Optionlabel");
const CoreMiniSales = () => import("@/components/core/minimumsales");
const CoreNewsfeedlabel = () => import("@/components/core/Newsfeedlabel");
const CoreNewsfeedbrand = () => import("@/components/core/Newsfeedbrand");
const CoreRecipient = () => import("@/components/core/Recipient");
const CoreFormManage = () => import("@/components/core/Formmanage");
const CoreMenuManage = () => import("@/components/core/Menumanage");
const CoreDepartment = () => import("@/components/core/DepartmentManage");
const CoreRolemanagment = () => import("@/components/core/Rolemanagment");
const CoreCorporatemanage = () => import("@/components/core/Corporatemanage");
const CmManage = () => import("@/components/core/cm_manage");
const CoreDatatran = () => import("@/components/core/Datatransfer");
const CoreDatareprocess = () => import("@/components/core/Datareprocess");
const CoreExternalCipher = () => import("@/components/core/ExternalCipher");
const ExternalCipherView = () => import("@/components/core/ExternalCipherView");

const Dashboard = () => import("@/components/dashboard/Dashboard");
const DashPerformance = () => import("@/components/dashboard/Performance");
const DashIncentive = () => import("@/components/dashboard/Incentive");

const ActCheckin = () => import("@/components/activity/Checkin");
const ActNewsfeed = () => import("@/components/activity/Newsfeed");
const TpActivityManagement = () => import("@/components/activity/ActivityManagement");
const TpLocationChecking = () => import("@/components/activity/LocationChecking");
const Visit = () => import("@/components/activity/Visit");

const TpSalesplan = () => import("@/components/planning/Salesplan");
const TpSalestarget = () => import("@/components/planning/Performance");
const TpPlanning = () => import("@/components/planning/Tripplan");
const TpApproval = () => import("@/components/planning/Approval");
const TpSalesincentive = () => import("@/components/planning/Salesincentive");
const TpPayment = () => import("@/components/planning/Payment-report");



const OdSalesactivity = () => import("@/components/orders/Salesactivity-report");
const OdBycustomers = () => import("@/components/orders/Bycustomers");
const OdMyorders = () => import("@/components/orders/Myorders");
const OdApproval = () => import("@/components/orders/Myorders");
const History = () => import("@/components/orders/History");
const SummaryOrder = () => import("@/components/orders/SummaryOrder");
const BackOrdManage = () => import("@/components/orders/BackOrdManage");
const MyBackOrder = () => import("@/components/orders/MyBackOrder");
const Information = () => import("@/components/orders/Information");
const DeliveryReport = () => import("@/components/orders/myorder-component/delivery_temp");
const Budget = () => import("@/components/orders/Budget");
const Inquiry = () => import("@/components/orders/inquiry");
const ReportBackorderTacking = () => import("@/components/orders/ReportBackorderTacking");
const testGraph = () => import("@/components/dashboard/testGraph");

const TripplanTest = () => import("@/components/develop/Test");
const Chat = () => import("@/components/chat/chat");

const TestExternalLink = () => import("@/components/test/externallink");
const TestService = () => import("@/components/test/test");

const maintenance = () => import("@/components/core/Maintenance");

Vue.use(Router);


export default new Router({
  // mode: 'history',
  routes: [{
    path: "*",
    redirect: "/dashboard"
  },
  {
    path: "/",
    name: "tripplan-login",
    component: CoreLogin
  },
  {
    path: "/setting/account",
    name: "setting-account",
    component: CoreAccount
  },
  {
    path: "/setting/usermanage",
    name: "setting-usermanege",
    component: CoreUsermanage
  },
  {
    path: "/setting/about",
    name: "setting-about",
    component: CoreAbout
  },
  {
    path: "/setting/moresetting",
    name: "setting-moresetting",
    component: CoreSetting
  },

  {
    path: "/setting/customermanagement",
    name: "setting-custmanage",
    component: CoreCustmanage
  },
  {
    path: "/setting/department",
    name: "setting-department",
    component: CoreDepartment
  },
  {
    path: "/setting/rolemanagment",
    name: "setting-role",
    component: CoreRolemanagment
  },
  {
    path: "/setting/corporatemanage",
    name: "setting-corporatemanage",
    component: CoreCorporatemanage
  },
  {
    path: "/setting/cm_manage",
    name: "setting-customer",
    component: CmManage
  },
  {
    path: "/setting/datatransfer",
    name: "setting-datatransfer",
    component: CoreDatatran
  },
  {
    path: "/setting/datareprocess",
    name: "setting-datareprocess",
    component: CoreDatareprocess
  },
  {
    path: "/setting/optionlabel",
    name: "setting-optionlabel",
    component: CoreOptionlabel
  },
  {
    path: "/setting/newsfeedlabel",
    name: "setting-newsfeedlabel",
    component: CoreNewsfeedlabel
  },
  {
    path: "/setting/newsfeedbrand",
    name: "setting-newsfeedbrand",
    component: CoreNewsfeedbrand
  },
  {
    path: "/setting/minisalesmangement",
    name: "setting-minisalesmangement",
    component: CoreMiniSales
  },
  {
    path: "/setting/recipient",
    name: "setting-recipient",
    component: CoreRecipient
  },
  {
    path: "/setting/formmanage",
    name: "form-mangement",
    component: CoreFormManage
  },
  {
    path: "/setting/menumanage",
    name: "menu-mangement",
    component: CoreMenuManage
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/dashboard/performance",
    name: "dash-performance",
    component: DashPerformance
  },
  {
    path: "/dashboard/incentive",
    name: "dashboard-incentive",
    component: DashIncentive
  },
  {
    path: "/activity/checkin",
    name: "activity-checkin",
    component: ActCheckin
  },
  {
    path: "/activity/newsfeed",
    name: "activity-newsfeed",
    component: ActNewsfeed
  },
  {
    path: "/activity/activity-management",
    name: "Activity-management",
    component: TpActivityManagement
  },
  {
    path: "/activity/location-checking",
    name: "location-checking",
    component: TpLocationChecking
  },
  {
    path: "/activity/visit",
    name: "visit-checkin",
    component: Visit
  },
  {
    path: "/planning/tripplan",
    name: "planning-tripplan",
    component: TpPlanning
  },
  {
    path: "/planning/approval",
    name: "planning-approval",
    component: TpApproval
  },
  {
    path: "/planning/salestarget",
    name: "planning-salestarget",
    component: TpSalestarget
  },
  {
    path: "/planning/salesplan",
    name: "planning-salesplan",
    component: TpSalesplan
  },
  {
    path: "/planning/salesincentive",
    name: "planning-salesincentive",
    component: TpSalesincentive
  },
  {
    path: "/planning/payment",
    name: "Payment-report",
    component: TpPayment
  },
  {
    path: "/reports/salesactivity-report",
    name: "salesactivity-report",
    component: OdSalesactivity
  },
  {
    path: "/orders/approval",
    name: "orders-approval",
    component: OdApproval
  },
  {
    path: "/orders/myorders",
    name: "orders-myorders",
    component: OdMyorders
  },
  {
    path: "/orders/bycustomers",
    name: "orders-bycustomers",
    component: OdBycustomers
  },
  {
    path: "/reports/history",
    name: "orders-history",
    component: History
  },
  {
    path: "/reports/summaryorders",
    name: "SummaryOrder",
    component: SummaryOrder
  },
  {
    path: "/orders/back-order-management",
    name: "back-order-management",
    component: BackOrdManage
  },
  {
    path: "/orders/my-back-order",
    name: "my-back-order",
    component: MyBackOrder
  },
  {
    path: "/reports/back-order-tracking",
    name: "back-order-tracking",
    component: ReportBackorderTacking
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat
  },
  {
    path: "/tripplan/test",
    name: "tripplan-test",
    component: TripplanTest
  },
  {
    path: "/orders/approval/view/:doc_no",
    name: "orders-approval/view",
    component: OdApproval
  },
  {
    path: "/orders/myorders/view/:doc_no",
    name: "orders-myorders/view",
    component: OdMyorders
  },
  {
    path: "/reports/information",
    name: "information",
    component: Information
  },
  {
    path: "/reports/mkt/report",
    name: "report",
    component: TestExternalLink
  },
  {
    path: "/link/to/page",
    name: "new-report",
    component: DeliveryReport
  },
  {
    path: "/reports/budget",
    name: "orders-budget",
    component: Budget
  },
  {
    path: "/reports/inquiry",
    name: "orders-inquiry",
    component: Inquiry
  },
  {
    path: "/test/test-service",
    name: "test-service",
    component: TestService
  },

  {
    path: "/edi/*",
    name: "edi",
    beforeEnter(e) {
      console.info('e', e);
      location.href = 'edi/#/' + e.params[0];
      // window.open('edi/#/' + e.params[0]);
    }
  },
  {
    path: "/dashboard/test-graph",
    name: "test-graph",
    component: testGraph
  },
  {
    path: "/setting/external",
    name: "setting-cipher",
    component: CoreExternalCipher
  },
  {
    path: "/cipher/admin",
    name: "external-cipher",
    component: ExternalCipherView
  },
  {
    path: "/dashboard/test-graph",
    name: "test-graph",
    component: testGraph
  },
  {
    path: "/setting/testexternal",
    name: "external-cipher",
    component: CoreExternalCipher
  },
  {
    path: "/cipher/admin",
    name: "external-cipher",
    component: ExternalCipherView
  }
    ,
  {
    path: "/dashboard/test-graph",
    name: "test-graph",
    component: testGraph
  },
  {
    path: "/maintenance",
    name: "setting-maintenance",
    component: maintenance
  },
  {
    path: "/retest",
    name: "tripplan-login",
    component: CoreLogin
  },

    //    {
    //        path: '/github',
    //        beforeEnter() {location.href = 'http://github.com'}
    //   }
  ]
});
