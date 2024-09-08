import { InsurancePolicyForm } from "./insurance-policy-form";
import Navbar from "../components/Navbar";
export default function NewSchemaPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create New Policy Schema</h1>
        <p>Empty Values will be ignored in the Schema</p>
        <InsurancePolicyForm />
      </div>
    </>
  );
}
