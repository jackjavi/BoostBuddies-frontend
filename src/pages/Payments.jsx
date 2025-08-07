import DetailedPaymentSummary from "./DetailedPaymentSummary";
import Aside from "../components/AsideComponent";

const Payments = () => {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden py-24 md:py-28">
      <div className="max-w-7xl mx-auto flex">
        <Aside activeTab="payments" />

        <main className="flex-1">
          <DetailedPaymentSummary />
        </main>
      </div>
    </div>
  );
};

export default Payments;
