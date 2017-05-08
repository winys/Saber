<template>
    <div class="Feedback">
        <article>
            <p>
                <span class="label">本次反馈的体验：</span>
                <section class="stars">
                  <span
                    v-for="item in max"
                    class="star_wrapper"
                    @mousemove="setCurrentValue(item, $event)"
                    @mouseleave="resetCurrentValue($event)"
                    @click="selectValue(item)"
                    :class="{ active: isActive(item) }">
                    <i class="fa" :class="{'fa-star':isActive(item),'fa-star-o':!isActive(item)}" aria-hidden="true"></i>&nbsp;
                  </span>
                  <span class="rate_text">{{ text }}</span>
                </section>
            </p>
            <p>
                <span class="label">本次反馈针对哪一部分：</span>
                <select>
                    <option value="">Saber 本身</option>
                    <option value="">Saber-http</option>
                    <option value="">Saber-iconv</option>
                </select>
            </p>
            <p>
                <span class="label">反馈原因:</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="最多130字符"></textarea>
            </p>
            <p>                
                <a class="btn sendbtn">发送给作者</a>
            </p>
        </article>
    </div>
</template>
<script>
    export default {
        data (){
            return{
                max: 5,
                currentValue : 3,
                value : 3
            }
        },
        computed:{
            text (){
                return ['极差', '失望', '一般', '满意', '惊喜'][this.currentValue-1];
            }
        },
        methods: {
          isActive (item){
              return item <= this.currentValue;
          },
          selectValue(value) {
            this.value = this.currentValue = value;
          },
          setCurrentValue(value, event) {
            if(this.currentValue !== value){
                this.value = this.currentValue;
                this.currentValue = value;
            }
          },
          resetCurrentValue() {
            this.currentValue = this.value;
          },
          showText(){
              return ""
          }
        }
    }
</script>
<style scoped>
    .Feedback{
        padding: 5px;
        font-size: 12px;
    }
    .Feedback .sendbtn{
        padding: 5px;
        float: right;
    }
    .Feedback p{
        padding: 10px;
    }
    .Feedback .label{
        display: block;
        padding: 10px 0;
    }
    .Feedback .stars{
        cursor: pointer;
    }
    .Feedback .star_wrapper.active{
        color: #ffa700;
    }
</style>