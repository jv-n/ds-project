import EmpresaForm from "../../components/formulario-empresas/EmpresaForm";
import FormContainer from "../../components/formulario-empresas/containers/FormContainer";
export default function FormularioEmpresasPage() {
  return (
    <FormContainer>
      <EmpresaForm className="max-w-6xl mx-auto" />
    </FormContainer>
  );
}
