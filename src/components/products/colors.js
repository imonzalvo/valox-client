export default function ColorPicker({}) {
  return (
    <div class="mb-6">
      <h4 class="mb-3 font-heading font-medium">
        <span>Color:</span>
        <span class="text-gray-400">Silver</span>
      </h4>
      <button class="inline-flex items-center justify-center p-1 rounded-full border border-gray-300">
        <div class="w-6 h-6 rounded-full bg-white"></div>
      </button>
      <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
        <div class="w-6 h-6 rounded-full bg-orange-800"></div>
      </button>
      <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
        <div class="w-6 h-6 rounded-full bg-blue-900"></div>
      </button>
      <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
        <div class="w-6 h-6 rounded-full bg-yellow-500"></div>
      </button>
    </div>
  );
}
