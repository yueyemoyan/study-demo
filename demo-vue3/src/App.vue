<template>
  <el-button type="primary" size="small" @click="dialogFormVisible = true">添加</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="name" label="Name"/>
    <el-table-column prop="address" label="操作">
      <template #default="scope">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small" @click="delTodoList(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="添加" width="500">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="时间" :label-width="formLabelWidth">
        <el-date-picker
        v-model="form.date"
        type="datetime"
        placeholder="Select date and time"
      />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveTodo">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import Web3 from 'web3'
  import contractABI from './contractABI.json' // 引入 contractABI.json 文件

  const form = reactive({
    name: '',
    date: '',
  })
  const tableData = ref([]);
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const contractAddress = ref('0x976Ca615520F8e524c2C97428d573041Bf3Cc608')
  const walltAddress = ref('')
  const privateKey = ref('')
  var account = ref('')
  var web3 = ref<Web3 | null>(null); // 将 web3 定义为一个 ref

  const getMetaMaskProvider = () => {
    if (window.ethereum.providers) {
      return window.ethereum.providers.find((provider) => provider.isMetaMask);
    }
    return window.ethereum;
  };

  const initWeb3 = async () => {
    const provider = getMetaMaskProvider();
    // 创建 web3 实例
    web3.value = new Web3(provider);

    try {
      ethereum.on('accountsChanged', (accounts) => {
        console.log('切换的账户:', accounts[0]);
        account.value = accounts[0];
      });

      // 获取用户账户
      const accounts = await web3.value.eth.getAccounts();
      account.value = accounts[0];
      console.log('当前账户:', account.value);

      // 请求用户授权
      await provider.request({ method: 'eth_requestAccounts' });
      // 后续操作，例如获取余额或发送交易
    } catch (error) {
      console.error('用户拒绝了连接请求');
    }
  }

  onMounted(async () => {
    await initWeb3(); // 在组件挂载时初始化 web3
    await getTableData();
  });

  const initContract = () => {
    if (!web3.value) return;
    const contract = new web3.value.eth.Contract(contractABI, contractAddress.value);
    console.log('合约已初始化:', contract);
  }

  // 添加待办事项
  const saveTodo = async () => {
    if (!web3.value) return;
    initContract();
    const contract = new web3.value.eth.Contract(contractABI, contractAddress.value);
    const accounts = await web3.value.eth.getAccounts();
    const account = accounts[0];
    const result = await contract.methods.addTodo(form.name, form.date.toString()).send({from: account})
    console.log(result)
    dialogFormVisible.value = false
    getTableData();
  }

  const getTableData = async () => {
    try {
      if (!web3.value) return;
      const accounts = await web3.value.eth.getAccounts();
      const account = accounts[0];
      const contract = new web3.value.eth.Contract(contractABI, contractAddress.value); // 初始化合约
      const result: {name: string; date: string}[] = await contract.methods.getTodoList().call({from: account})
      tableData.value = result.map((item) => {
        return {
          name: item.name,
          date: item.date,
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const delTodoList = async (index: number) =>  {
    if (!web3.value) return;
    const accounts = await web3.value.eth.getAccounts();
    const account = accounts[0];
    const contract = new web3.value.eth.Contract(contractABI, contractAddress.value);
    await contract.methods.deleteTodo(index).send({from: account})
    getTableData()
    console.log(index)
  }

</script>
