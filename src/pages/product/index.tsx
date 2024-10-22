import PrimaryButton from "@/components/@shared/button/PrimaryButton";
import SecondaryButton from "@/components/@shared/button/SecondaryButton";
import TertiaryButton from "@/components/@shared/button/TertiaryButton";

export default function ProductPage() {
  return (
    <div className="w-[500px] h-[500px] text-white p-3 ">
      <PrimaryButton onClick={() => {}} active={true}>
        가입하기
      </PrimaryButton>
      <div className="h-10">PrimaryButton / active - true</div>
      <PrimaryButton onClick={() => {}} active={false}>
        가입하기
      </PrimaryButton>
      <div className="h-20">PrimaryButton / active - false</div>
      <SecondaryButton onClick={() => {}} active={true}>
        비교하기
      </SecondaryButton>
      <div className="h-10">SecondaryButton / active - true</div>
      <SecondaryButton onClick={() => {}} active={true}>
        비교하기
      </SecondaryButton>
      <div className="h-10">SecondaryButton / active - true /hover</div>
      <SecondaryButton onClick={() => {}} active={false}>
        비교하기
      </SecondaryButton>
      <div className="h-20">SecondaryButton / active - false</div>
      <TertiaryButton onClick={() => {}} active={true}>
        편집하기
      </TertiaryButton>
      <div className="h-10">TertiaryButton / active - true</div>
      <TertiaryButton onClick={() => {}} active={true}>
        편집하기
      </TertiaryButton>
      <div className="h-10">TertiaryButton / active - true / hover</div>
      <TertiaryButton onClick={() => {}} active={false}>
        편집하기
      </TertiaryButton>
      <div className="h-10">TertiaryButton / active - false</div>
    </div>
  );
}
